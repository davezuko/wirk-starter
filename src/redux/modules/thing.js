import axios from 'axios';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_THING_PENDING = 'GET_THING_PENDING';
export const GET_THING_SUCCESS = 'GET_THING_SUCCESS';
export const GET_THING_FAILURE = 'GET_THING_FAILURE';
export const POST_THING_PENDING = 'POST_THING_PENDING';
export const POST_THING_SUCCESS = 'POST_THING_SUCCESS';
export const POST_THING_FAILURE = 'POST_THING_FAILURE';
export const DELETE_THING_PENDING = 'DELETE_THING_PENDING';
export const DELETE_THING_SUCCESS = 'DELETE_THING_SUCCESS';
export const DELETE_THING_FAILURE = 'DELETE_THING_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export const getThing = () => {
  return (dispatch, getState) => {
    const config = {
      url: '/api/things',
      method: 'get'
    };

    if (getState().isAuthenticated) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }

    return axios(config)
      .then(({ data }) => {
        dispatch(getThingSuccess(data));
      });
  };
};

export const postThing = ({ name }) => {
  return (dispatch, getState) => {
    const config = {
      url: '/api/things',
      method: 'get'
    };

    if (getState().isAuthenticated) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
    
    return axios.post('/api/things', { name })
      .then(({ data }) => {
        dispatch(postThingSuccess(data));
      });
  };
};

export const deleteThing = (_id) => {
  return (dispatch, getState) => {
    const config = {
      url: '/api/things',
      method: 'get'
    };

    if (getState().isAuthenticated) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }

    return axios.delete(`/api/things/${_id}`)
      .then((res) => {
        dispatch(deleteThingSuccess(_id));
      });
  };
};

export const getThingSuccess = (things) => ({
  type: GET_THING_SUCCESS,
  payload: things
});

export const postThingSuccess = (thing) => ({
  type: POST_THING_SUCCESS,
  payload: thing
});

export const deleteThingSuccess = (_id) => ({
  type: DELETE_THING_SUCCESS,
  payload: _id
});

export const actions = {
  getThing,
  getThingSuccess,
  postThing,
  postThingSuccess,
  deleteThing,
  deleteThingSuccess
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_THING_SUCCESS] (state, { payload: things }) {
    return things;
  },

  [POST_THING_SUCCESS] (things, { payload: thing }) {
    return [...things, thing];
  },

  [DELETE_THING_SUCCESS] (things, { payload: _id }) {
    const index = _.findIndex(things, (thing) => thing._id === _id);

    return [
      ...things.slice(0, index),
      ...things.slice(index + 1)
    ];
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = [];
export default function thingReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
