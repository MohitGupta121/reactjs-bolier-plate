import {FieldArray, Form, Formik, validateYupSchema, yupToFormErrors} from 'formik';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Card} from 'react-bootstrap';
import {connect} from 'react-redux';
import {useParams} from 'react-router';
import {bindActionCreators} from 'redux';
import Button from '../../../components/Button';
import {BUTTON_TYPES, INPUT_TYPES} from '../../../components/constants';
import Input from '../../../components/Input';
import ModalComponent from '../../../components/Modal';
import Radio from '../../../components/RadioButton';
import SingleSelect from '../../../components/SingleSelect';
import {addCategory, addCategoryTag, categoryList} from '../../../store/Entity/EntityAction';
import '../../../translation';
import {createCategoryValidations} from '../../../utils/validations';
import DeleteCategoryDialog from './DeleteCategoryDialog';

const Category = ({
  handle,
  category,
  categories,
  addCategory,
  addCategoryTag,
  deleteCategory,
  getCategoryList,
  allCategories,
  categoryIndex,
  savedCategories,
}) => {
  const [showInput, setShowInput] = useState(true);
  const [items, setItems] = useState(category.tags);
  const [categoryList, setCategoryList] = useState(categories);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState({
    categoryId: '',
  });
  const [spinner, setSpinner] = useState({
    addTag: false,
    createCategory: false,
  });
  const [showCreateOptions, setShowOptions] = useState(false);
  const [showIcon, setShowIcon] = useState(category.name !== '');
  const {entityId} = useParams();
  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({behavior: 'smooth'});
  });

  const openDeleteConfirmationModal = (id) => {
    if (id) {
      setShowDeleteCategoryModal({categoryId: categoryIndex});
    } else {
      deleteCategory(categoryIndex);
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    border: isDragging ? 'green' : 'grey',
    ...draggableStyle,
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reOrderedItems = reorder(items, result.source.index, result.destination.index);
    setItems(reOrderedItems);
  };

  const selectText = (index) => {
    const array = [...items];
    array[index].selected = !array[index].selected;
    setItems(array);
    setSelectedItems(array.filter((item) => item.selected));
  };

  const editItem = () => {};

  const deleteItem = () => {
    const array = [...items];
    setItems(array.filter((item) => !item.selected));
    setSelectedItems([]);
  };

  const createCategory = (values) => {
    if (
      !values.name ||
      !values.financial_code.key ||
      (values.financial_code.key == 1 && !values.financial_code.value)
    ) {
      return;
    }
    setSpinner({createCategory: true});
    addCategory(
      {
        id: entityId,
        data: {
          name: values.name,
          financial_code: {
            key: values.financial_code['key'],
            value: values.financial_code['value'],
          },
        },
      },
      () => setSpinner({createCategory: false}),
      () => {
        setShowOptions(false);
        getCategoryList(
          {id: entityId},
          () => {},
          () => {}
        );
      }
    );
  };

  const createCategoryTag = (data, id) => {
    setSpinner((prev) => {
      return {...prev, addTag: true};
    });
    addCategoryTag(
      {id: id, data: data, entityId: entityId},
      () => {
        setSpinner((prev) => {
          return {...prev, addTag: false};
        });
      },
      () => {}
    );
  };

  const deleteCategoryById = () => {
    const id = showDeleteCategoryModal.categoryId;
    setShowDeleteCategoryModal({categoryId: ''});
    deleteCategory(
      id,
      () => {},
      () => setShowDeleteCategoryModal({categoryId: ''})
    );
  };
  const onSearch = (e) => {
    const searchTxt = e.target.value;
    setCategoryList(
      categories.filter((list) => list.name.toLowerCase().includes(searchTxt.toLowerCase()))
    );
  };
  const handleFinancialCodeSetup = (tagsLength) => {
    if (tagsLength === 0) {
      setShowOptions(!showCreateOptions);
    }
  };

  const [addCategoryConfig, setAddCategoryConfig] = useState({
    placeholder: categoryIndex === 0 ? ' Add a Category...' : ' Add another Category',
    icon: 'icon-add-category',
  });

  const onInputClick = () => {
    setAddCategoryConfig({
      placeholder: 'Name the Category...',
    });
  };

  return (
    <div className='d-flex flex-column'>
      <Card className='category-card' style={{width: '350px', height: 'auto'}}>
        <ModalComponent
          modalShow={
            showDeleteCategoryModal.categoryId || showDeleteCategoryModal.categoryId === 0
              ? true
              : false
          }
          hideModal={() => setShowDeleteCategoryModal({categoryId: ''})}
          dialogClassName={'modal-650w'}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <DeleteCategoryDialog
            onCancel={() => setShowDeleteCategoryModal({categoryId: ''})}
            onSubmit={() => deleteCategoryById()}
          />
        </ModalComponent>
        <Formik
          enableReinitialize
          initialValues={{...category, allCategories, savedCategories}}
          onSubmit={() => {}}
          validate={(value) => {
            try {
              validateYupSchema(value, createCategoryValidations, true, value);
            } catch (err) {
              return yupToFormErrors(err);
            }
            return {};
          }}
        >
          {() => {
            return (
              <FieldArray name='tags'>
                {(fieldArrayProps) => {
                  const {form, remove, push} = fieldArrayProps;
                  const {
                    touched,
                    values,
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                  } = form;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <Card.Header>
                        <i
                          className={`icon-navigate ${showCreateOptions ? 'transform' : ''} ${
                            errors.name ? 'top-14' : ''
                          }`}
                          style={{display: showIcon ? 'inline' : 'none'}}
                          onClick={() => handleFinancialCodeSetup(values.tags.length)}
                        />
                        <SingleSelect
                          onClick={onInputClick}
                          placeholder={addCategoryConfig.placeholder}
                          options={categoryList}
                          onInputChange={onSearch}
                          value={values.name}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          setFieldValue={setFieldValue}
                          touched={touched.name}
                          error={errors.name}
                          setShowIcon={setShowIcon}
                          showIcon={showIcon}
                          readOnly={category.id ? true : false}
                          setShowOptions={setShowOptions}
                          icon={addCategoryConfig.icon}
                        />
                        <i className='icon-drag' {...handle}></i>
                      </Card.Header>
                      {showCreateOptions && (
                        <div className='create-options'>
                          <div className='radio-btns'>
                            <div className='financial-code'>
                              <Radio
                                label={'Require Financial Code'}
                                id='link'
                                value='displayName'
                                selected={showInput}
                                onChange={() => {
                                  setShowInput(true);
                                  setFieldValue('financial_code.key', '1', false);
                                }}
                              />
                              {showInput && (
                                <Input
                                  inputType={INPUT_TYPES.text}
                                  placeholder={
                                    !(touched.financial_code?.value && errors.financial_code?.value)
                                      ? 'Display name(i.e. cost center)'
                                      : null
                                  }
                                  error={
                                    touched.financial_code?.value && errors.financial_code?.value
                                  }
                                  inputClass={
                                    touched.financial_code?.value && errors.financial_code?.value
                                      ? 'is-invalid'
                                      : ''
                                  }
                                  name='financial_code.value'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.financial_code.value}
                                />
                              )}
                            </div>
                            <Radio
                              label="Don't require financial code"
                              id='donot'
                              onChange={() => {
                                setShowInput(false);
                                setFieldValue('financial_code', {key: '0', value: ''}, false);
                              }}
                              selected={!showInput}
                            />
                          </div>
                          <Button
                            className='create-btn'
                            variant={BUTTON_TYPES.light}
                            title={category.id ? 'save' : 'create'}
                            disabled={spinner.createCategory}
                            icon={category.id ? 'icon-tick' : 'icon-add-category'}
                            isLoading={spinner.createCategory}
                            onButtonClick={() => {
                              setFieldTouched('financial_code.value');
                              setFieldTouched('name');
                              createCategory(values, push);
                            }}
                          />
                        </div>
                      )}
                      <>
                        {values.tags[0]?.id && (
                          <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId='droppable2' direction='vertical'>
                              {(provided) => (
                                <Card.Body ref={provided.innerRef} {...provided.droppableProps}>
                                  {values.tags.map((item, index) =>
                                    item.id ? (
                                      <Draggable
                                        key={index}
                                        draggableId={item.id.toString()}
                                        index={index}
                                      >
                                        {(provided, snapshot) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                              snapshot.isDragging,
                                              provided.draggableProps.style
                                            )}
                                            className='tags-created'
                                            onClick={() => selectText(index)}
                                          >
                                            {`${item.name} ${
                                              item.display_name ? '(' + item.display_name + ')' : ''
                                            }`}
                                            {item.selected ? (
                                              <i className='icon-circle-tick' />
                                            ) : (
                                              ''
                                            )}
                                          </div>
                                        )}
                                      </Draggable>
                                    ) : null
                                  )}
                                  {provided.placeholder}
                                  <div ref={divRef} />
                                </Card.Body>
                              )}
                            </Droppable>
                          </DragDropContext>
                        )}
                        {category.id && !showCreateOptions ? (
                          values.tags.length === 0 || values.tags[values.tags.length - 1]?.id ? (
                            <div
                              className='add-a-tag'
                              onClick={() => {
                                push({name: '', display_name: ''});
                              }}
                            >
                              <i className='icon-add-category' />{' '}
                              {`add a ${values.name.toUpperCase()} tag`}
                            </div>
                          ) : (
                            <div className='add-new-tag'>
                              <div className='d-flex'>
                                <Input
                                  inputType={INPUT_TYPES.text}
                                  name={`tags.${values.tags.length - 1}.name`}
                                  className={
                                    values.financial_code.key == '1'
                                      ? 'tag-name'
                                      : 'tag-name width-96'
                                  }
                                  placeholder={`New ${values.name} Name...`}
                                  inputClass={
                                    errors['tags'] &&
                                    errors['tags'][values.tags.length - 1] &&
                                    errors['tags'][values.tags.length - 1].name &&
                                    touched['tags'] &&
                                    touched['tags'][values.tags.length - 1] &&
                                    touched['tags'][values.tags.length - 1].name
                                      ? 'is-invalid'
                                      : ''
                                  }
                                  onChange={handleChange}
                                  error={
                                    touched['tags'] &&
                                    touched['tags'][values.tags.length - 1] &&
                                    touched['tags'][values.tags.length - 1].name &&
                                    errors['tags'] &&
                                    errors['tags'][values.tags.length - 1] &&
                                    errors['tags'][values.tags.length - 1].name
                                  }
                                  errorClass='ml-10'
                                  onBlur={handleBlur}
                                  value={values['tags'][values.tags.length - 1]?.name}
                                />
                                {values.financial_code.key == '1' && (
                                  <Input
                                    inputType={INPUT_TYPES.text}
                                    name={`tags.${values.tags.length - 1}.display_name`}
                                    className='display-name'
                                    placeholder={values?.financial_code?.value}
                                    errorClass='ml-10'
                                    inputClass={
                                      errors['tags'] &&
                                      errors['tags'][values.tags.length - 1] &&
                                      errors['tags'][values.tags.length - 1].display_name &&
                                      touched['tags'] &&
                                      touched['tags'][values.tags.length - 1] &&
                                      touched['tags'][values.tags.length - 1].display_name
                                        ? 'is-invalid'
                                        : ''
                                    }
                                    onChange={handleChange}
                                    error={
                                      touched['tags'] &&
                                      touched['tags'][values.tags.length - 1] &&
                                      touched['tags'][values.tags.length - 1].display_name &&
                                      errors['tags'] &&
                                      errors['tags'][values.tags.length - 1] &&
                                      errors['tags'][values.tags.length - 1].display_name
                                    }
                                    onBlur={handleBlur}
                                    value={values['tags'][values.tags.length - 1]?.display_name}
                                  />
                                )}
                              </div>
                              <Button
                                variant={BUTTON_TYPES.outlineDark}
                                title='add'
                                disabled={errors.tags?.length ? true : false}
                                onButtonClick={() =>
                                  createCategoryTag(
                                    values['tags'][values.tags.length - 1],
                                    values.id ? values.id : category.id
                                  )
                                }
                                isLoading={spinner.addTag}
                              />
                              <i
                                className='icon-remove-user'
                                onClick={() => {
                                  remove(values.tags.length - 1);
                                }}
                              />
                            </div>
                          )
                        ) : null}
                      </>
                    </Form>
                  );
                }}
              </FieldArray>
            );
          }}
        </Formik>
      </Card>
      <div className='action-link d-flex justify-content-end'>
        {/* <a className='delete-category' onClick={() => openDeleteConfirmationModal(category.id)}>
          {t('deleteCategory.link')}
        </a> */}
        {selectedItems.length ? (
          <div>
            <a className='edit' onClick={() => editItem()}>
              Edit
            </a>
            <a className='delete' onClick={() => deleteItem()}>
              Delete
            </a>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.any,
  handle: PropTypes.object,
  categories: PropTypes.array,
  addCategory: PropTypes.func,
  addCategoryTag: PropTypes.func,
  deleteCategory: PropTypes.func,
  getCategoryList: PropTypes.func,
  allCategories: PropTypes.any,
  categoryIndex: PropTypes.number,
  savedCategories: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    categories: state.Entity.categories,
    allCategories: state.Entity.allCategories,
    savedCategories: state.Entity.savedCategories,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addCategory: bindActionCreators(addCategory, dispatch),
  getCategoryList: bindActionCreators(categoryList, dispatch),
  addCategoryTag: bindActionCreators(addCategoryTag, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
