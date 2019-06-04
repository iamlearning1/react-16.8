import { combineReducers } from 'redux';

import burgerBuilderReducer from './burgerBuilderReducer';

const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer
});

export default reducer;
