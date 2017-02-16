import React from 'react'
import ConditionListContainer from '../containers/ConditionListContainer'
import ActionListContainer from '../containers/ActionListContainer'
//import ReviewContainer from '../containers/ReviewContainer'
//import StatusMessageContainer from '../containers/StatusMessageContainer'
import './Rule.scss'

// TODO consider using redux forms
// TODO change what is displayed based on location hash (#conditions, #actions, etc.)
export const Rule = ({
  id,
  updateRule,
  description,
  updateDescription,
  params
}) => (
  <div>
    <form onSubmit={e => {
      e.preventDefault()
      updateRule()
    }}>
      <div className='form-group'>
        <label
          className='control-label'
          htmlFor='description-input'
        >
          Description
        </label>
        <input
          id='description-input'
          className='form-control'
          type='text'
          value={description}
          onChange={e => {
            updateDescription({
              id,
              description: e.target.value
            })
          }}
        />
      </div>
      <div className='form-group'>
        <label
          className='control-label'
          htmlFor='start-input'
        >
          Start Date
        </label>
        <input
          id='start-input'
          className='form-control'
          type='date'
        />
      </div>
      <ul className='nav nav-tabs' role='tablist'>
        <li role='presentation' className='active'>
          <a href='#conditions' role='tab' data-toggle='tab'>Conditions</a>
        </li>
        <li role='presentation'>
          <a href='#actions' role='tab' data-toggle='tab'>Actions</a>
        </li>
        <li role='presentation'>
          <a href='#review' role='tab' data-toggle='tab'>Review</a>
        </li>
      </ul>
      <div className='tab-content'>
        <div role='tabpanel' id='conditions' className='form-group tab-pane active fade in'>
          <ConditionListContainer ruleId={params.id} />
        </div>
        <div role='tabpanel' id='actions' className='form-group tab-pane fade'>
          <ActionListContainer ruleId={params.id} />
        </div>
        <div role='tabpanel' id='review' className='form-group tab-pane fade'>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </div>
      </div>
    </form>
  </div>
)

Rule.propTypes = {
  id: React.PropTypes.string.isRequired,
  updateRule: React.PropTypes.func.isRequired,
  description: React.PropTypes.string.isRequired,
  updateDescription : React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired
}

export default Rule
