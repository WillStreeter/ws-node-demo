import {IAnimalDocument} from '../data-abstracts/repositories/animal';
import {IMealResponse} from '../../service-layer/responses/IMealResponse';

export class AnimalModel {

  private _animalModel: IAnimalDocument;

  constructor(iAnimalDocument: IAnimalDocument) {
    this._animalModel = iAnimalDocument;
  }

  get id(): string {
    return (this._animalModel.id).toString();
  }

  get specie(): string {
    return this._animalModel.specie;
  }
  get meals(): IMealResponse[] {
    return this._animalModel.meals;
  }
  get createdAt(): Date {
    return this._animalModel.createdAt;
  }

  get modifiedAt(): Date {
    return this._animalModel.modifiedAt;
  }
}
