import React from 'react';
import { Drawable } from '@psychobolt/react-regl';
import bunny from 'bunny';
import normals from 'angle-normals';

import vert from './Bunny.vert';

const attributes = {
  position: bunny.positions,
  normal: normals(bunny.cells, bunny.positions),
};

export default () => (
  <Drawable
    vert={vert}
    attributes={attributes}
    elements={bunny.cells}
  />
);
