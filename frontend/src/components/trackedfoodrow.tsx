
import * as React from 'react';
import { Ingredient } from '../classes';

export function TrackedFoodRow(
  props: {
    mealIdx: number,
    food: Ingredient,
    handleRemoveClick: (mealIdx: number, food: Ingredient) => void
  }
) {
  let tdStyle: React.CSSProperties = {
    'border': '1px solid black'
  };
  return (
    <tr>
      <td style={tdStyle}>{props.food.name}</td>
      <td style={tdStyle}>{props.food.amount}</td>
      <td style={tdStyle}>{props.food.fat}</td>
      <td style={tdStyle}>{props.food.protein}</td>
      <td style={tdStyle}>{props.food.carbs}</td>
      <td style={tdStyle}>{props.food.calories}</td>
      <td style={tdStyle}>
        <button
          onClick={() => props.handleRemoveClick(props.mealIdx, props.food)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
