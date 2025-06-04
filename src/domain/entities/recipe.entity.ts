export interface IRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Recipe implements IRecipe {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly ingredients: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(
    id: string,
    title: string,
    description: string,
    ingredients: string[]
  ): Recipe {
    const now = new Date();
    return new Recipe(id, title, description, ingredients, now, now);
  }

  update(title?: string, description?: string, ingredients?: string[]): Recipe {
    return new Recipe(
      this.id,
      title ?? this.title,
      description ?? this.description,
      ingredients ?? this.ingredients,
      this.createdAt,
      new Date()
    );
  }
}
