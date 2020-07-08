export class CollisionShape {
  id: number = 0;

  toJSON(): {} {
    return {};
  }
}

export class BoxShape extends CollisionShape {
  id: number
  shapeType: string;
  halfExtents: number[]

  constructor(halfExtents: number[]) {
    super();
    this.id = 0;
    this.shapeType = "box";
    this.halfExtents = halfExtents;
  }

  toJSON() {
    return {
      id: this.id,
      shapeType: this.shapeType,
      halfExtents: this.halfExtents
    };
  }
}

export class SphereShape extends CollisionShape {
  id: number
  shapeType: string;
  radius: number

  constructor(radius: number) {
    super();
    this.id = 0;
    this.shapeType = "sphere";
    this.radius = radius;
  }

  toJSON() {
    return {
      id: this.id,
      shapeType: this.shapeType,
      radius: this.radius
    };
  }
}