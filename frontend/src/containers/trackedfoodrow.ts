import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actions, Actions } from '../actions';
import { Ingredient } from '../classes';
import { TrackedFoodRow } from '../components/trackedfoodrow';
import { StoreState } from '../types';

function mapStateToProps(state: StoreState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    handleRemoveClick: (mealIdx: number, food: Ingredient) => {
      dispatch(actions.removeFoodFromMeal(mealIdx, food));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackedFoodRow);
