import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'history',
  /*  Async getComponent is only invoked when route matches   */
  getIndexRoute (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const InquiriesHistory = require('./containers/InquiriesHistoryContainer').default
      const reducer = require('../../modules/dashboard').default

      /*  Add the reducer to the store on key 'inquiriesHistory'  */
      injectReducer(store, { key: 'inquiriesHistory', reducer })

      /*  Return getComponent   */
      cb(null, { component: InquiriesHistory })

    /* Webpack named bundle   */
  }, 'inquiriesHistory')
  }
})
