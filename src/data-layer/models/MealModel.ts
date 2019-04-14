import {IMealDocument} from '../data-abstracts/repositories/meal';

export class MealModel {

  private _mealModel: IMealDocument;

  constructor(iMealDocument: IMealDocument) {
    this._mealModel = iMealDocument;
  }

  get id(): string {
    return (this._mealModel.id).toString();
  }

  get food(): string {
    return this._mealModel.food;
  }

  get createdAt(): Date {
    return this._mealModel.createdAt;
  }

  get modifiedAt(): Date {
    return this._mealModel.modifiedAt;
  }
}
