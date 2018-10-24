import { SearchIngredientRow } from '../components/searchingredientrow';
import { actions, Actions } from '../actions/';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NDBed } from '../classes';
import { getNDBIngredient } from '../lookup';

function mapStateToProps(state: StoreState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<Actions>) {
  return {
    onSaveClick: (ndbed: NDBed) => {
      getNDBIngredient(ndbed).then((ingred) => dispatch(actions.saveIngredient(ingred)));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchIngredientRow);