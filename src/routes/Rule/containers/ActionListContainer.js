import { connect } from 'react-redux'
import {
  addAction
} from '../modules/actions'
import ActionList from '../components/ActionList'

const mapDispatchToProps = {
  addAction
}

const mapStateToProps = (state, ownProps) => ({
  actions: state.actions.toJS()
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionList)
