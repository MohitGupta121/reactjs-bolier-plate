import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {bindActionCreators} from 'redux';
import Button from '../../../../components/Button';
import {BUTTON_TYPES} from '../../../../components/constants';
import {addUnitTag} from '../../../../store/Entity/AddUnit/AddUnitAction';
import './assign-tags.scss';

const AssignTags = ({addUnitTag, currentUnit, entity, currentRoute}) => {
  const [spinner, setSpinner] = useState({assignTags: false});
  const [items, setItems] = useState(currentUnit.categories);
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {entityId, unitId} = useParams();

  const description = t('assignTags.description')
    .replaceAll('[Unit]', entity.locationLabel?.singular)
    .replaceAll('[Units]', entity.locationLabel?.plural)
    .replaceAll('[Unit’s]', `${entity.locationLabel?.singular}'s`);

  const selectText = (index, tagIndex) => {
    const array = [...items];
    array[index].tags[tagIndex].selected = !array[index].tags[tagIndex].selected;
    setItems(array);
  };

  const assignTags = () => {
    setSpinner({assignTags: true});
    let selectedTags = [];
    items.forEach((category) => {
      const ids = category.tags.filter((tag) => tag.selected).map((_tag) => _tag.id);
      selectedTags = selectedTags.concat(ids);
    });

    const payload = {
      tags: {tag_ids: selectedTags},
      unitId,
    };
    if (selectedTags.length) {
      addUnitTag(
        payload,
        () => setSpinner({assignTags: false}),
        () =>
          navigate(currentRoute ? currentRoute : `/setup/${entityId}/unit/${unitId}/invite-user`)
      );
    } else {
      navigate(currentRoute ? currentRoute : `/setup/${entityId}/unit/${unitId}/invite-user`);
    }
  };

  return (
    <Container className='assign-tags'>
      <div className='entity-name'>{entity.name}</div>
      <div className='page-title'>{`${currentUnit.name} 
      ${currentUnit.id_number ? '(' + currentUnit.id_number + ')' : ''}: ${t(
        'assignTags.title'
      )}`}</div>
      <div className='description'>{description}</div>
      <Row className='category-row'>
        {items?.map((category, index) => (
          <Col sm={4} key={index}>
            <div className='card-section'>
              <Card className='category-card' style={{width: '350px', height: 'auto'}}>
                <Card.Header>
                  <div className='card-title'>
                    <i className='icon-navigate' />
                    <span>{category.name}</span>
                  </div>
                </Card.Header>
                {category.tags?.length > 0 && (
                  <Card.Body>
                    {category.tags.map((tag, tagIndex) => (
                      <div
                        key={tagIndex}
                        className='tags-created'
                        onClick={() => {
                          selectText(index, tagIndex);
                        }}
                      >
                        {`${tag.name} ${tag.display_name ? '(' + tag.display_name + ')' : ''}`}
                        {tag.selected ? <i className='icon-tick' /> : ''}
                      </div>
                    ))}
                  </Card.Body>
                )}
                <div className='add-a-tag' onClick={() => {}}>
                  <i className='icon-add-category' /> {`add a ${category.name} tag`}
                </div>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <div className='action-btns'>
        <Button variant={BUTTON_TYPES.outlineDark} title={t('assignTags.saveAndExit')} />
        <Button
          onButtonClick={() => {
            assignTags();
          }}
          variant={BUTTON_TYPES.outlineDark}
          title={t('assignTags.nextBtn')}
          isLoading={spinner.assignTags}
        />
      </div>
      <div
        className='back-link'
        onClick={() => navigate(`/setup/${entityId}/unit/${unitId}/update-unit`)}
      >
        &lt; Back
      </div>
    </Container>
  );
};

AssignTags.propTypes = {
  entity: PropTypes.any,
  currentUnit: PropTypes.any,
  addUnitTag: PropTypes.func,
  currentRoute: PropTypes.string,
  entityCategoryList: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currentUnit: state.AddUnit.currentUnit,
    entity: state.Entity.currentEntity,
    currentRoute: state.AddUnit.currentRoute,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addUnitTag: bindActionCreators(addUnitTag, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignTags);
