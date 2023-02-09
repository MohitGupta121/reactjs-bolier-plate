import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Container, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {bindActionCreators} from 'redux';
import {BUTTON_TYPES} from '../../../components/constants';
import Loader from '../../../components/Loader';
import ModalComponent from '../../../components/Modal';
import {
  categoryList,
  entityCategoryList,
  updateSetupStatus,
} from '../../../store/Entity/EntityAction';
import '../../../translation';
import Button from '../.././../components/Button';
import {CategoryModel} from '../../shared/Models/category';
import AddTagsDialog from './AddTagsDialog';
import Category from './Category';
import './manage-tags.scss';

const ManageTags = ({
  getCategoryList,
  entityCategoryList,
  savedCategories,
  entity,
  updateSetupStatus,
}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState({
    listLoading: false,
    setupStatus: false,
  });
  const [showAddTagsModal, setShowAddTagsModal] = useState(false);
  const [error, setError] = useState();
  const [items, setItems] = useState(savedCategories);
  const {entityId} = useParams();

  useEffect(() => {
    setSpinner((prev) => {
      return {...prev, listLoading: true};
    });
    entityCategoryList(
      {id: entityId},
      () => {},
      () => {
        getCategoryList({id: entityId}, () => {
          setSpinner((prev) => {
            return {...prev, listLoading: false};
          });
        });
      }
    );
  }, []);

  useEffect(() => {
    setItems(savedCategories);
    if (savedCategories.length) {
      const _savedCategory = savedCategories.filter((category) => category.id);
      if (_savedCategory.length === 0) {
        setShowAddTagsModal(true);
      }
    }
  }, [savedCategories]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getItemStyle = (draggableStyle) => ({
    userSelect: 'none',
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'white' : 'none',
    display: 'flex',
    justifyContent: 'start',
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(items, result.source.index, result.destination.index);
    setItems(reorderedItems);
  };

  const deleteCategory = (id) => {
    const array = [...items];
    setItems(
      array.filter((item, index) => {
        return index !== id;
      })
    );
  };

  const addCategory = () => {
    setItems((prev) => {
      return [...prev, new CategoryModel()];
    });
  };

  const setupStatusUpdate = () => {
    const category = items.filter((category) => category.id);
    if (!category.length) {
      setError('Please create at least one category');
      return;
    }
    const tags = category.filter((_category) => _category.tags.length === 0);
    if (tags?.length) {
      setError('All categories should have a tag');
      return;
    }
    setSpinner((prev) => {
      return {...prev, setupStatus: true};
    });
    updateSetupStatus(
      {
        id: entityId,
        data: {
          step: 3,
        },
      },
      () => {
        setSpinner((prev) => {
          return {...prev, setupStatus: false};
        });
      },
      () => navigate(`/setup/${entityId}/add-unit`)
    );
  };
  const description1 = t('manageTags.description.para1')
    .replaceAll('[Unit]', entity.locationLabel?.singular)
    .replaceAll('[Units]', entity.locationLabel?.plural);
  const description2 = t('manageTags.description.para2')
    .replaceAll('[Unit]', entity.locationLabel?.singular)
    .replaceAll('[Units]', entity.locationLabel?.plural);

  return spinner.listLoading ? (
    <Loader />
  ) : (
    <Container className='manage-tags'>
      <ModalComponent
        modalShow={showAddTagsModal}
        hideModal={() => setShowAddTagsModal(false)}
        dialogClassName={'modal-650w'}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <AddTagsDialog onSubmit={() => setShowAddTagsModal(false)} entity={entity} />
      </ModalComponent>
      <div className='entity-name'>{entity.name}</div>
      <div className='page-title'>{t('manageTags.title')}</div>
      <div className='description'>
        <div>{description1}</div>
        <div className='para-2'>{description2}</div>
      </div>
      <div className='drop-content'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppable' direction='horizontal'>
            {(provided, snapshot) => (
              <Row
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {items.map((item, index) => (
                  <div key={index} className='category-column'>
                    <Draggable draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <div
                          className='p-0'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(provided.draggableProps.style)}
                        >
                          <div className='card-section'>
                            <Category
                              deleteCategory={deleteCategory}
                              handle={provided.dragHandleProps}
                              category={item}
                              categoryIndex={index}
                              formik
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                    {index === items.length - 1 ? (
                      <div className='add-category-column'>
                        <div className='add-a-category' onClick={() => addCategory()}>
                          <i className='icon-add-category' />
                          <div className='add-text'>category</div>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
                {provided.placeholder}
                {!items.length ? (
                  <div className='add-category-column l-0'>
                    <div className='add-a-category' onClick={() => addCategory()}>
                      <i className='icon-add-category' />
                      <div className='add-text'>category</div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </Row>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className='text-center'>
        <div className='error-message'>{error}</div>
        <Button
          variant={BUTTON_TYPES.outlineDark}
          title={'Done'}
          onButtonClick={() => setupStatusUpdate()}
          isLoading={spinner.setupStatus}
        />
      </div>
    </Container>
  );
};

ManageTags.propTypes = {
  getCategoryList: PropTypes.func,
  savedCategories: PropTypes.array,
  updateSetupStatus: PropTypes.func,
  entityCategoryList: PropTypes.func,
  entity: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    savedCategories: state.Entity.savedCategories,
    entity: state.Entity.currentEntity,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCategoryList: bindActionCreators(categoryList, dispatch),
  entityCategoryList: bindActionCreators(entityCategoryList, dispatch),
  updateSetupStatus: bindActionCreators(updateSetupStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTags);
