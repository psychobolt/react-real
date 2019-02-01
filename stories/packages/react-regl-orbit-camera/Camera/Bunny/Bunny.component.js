import React from 'react';
import bunny from 'bunny';
import normals from 'angle-normals';

import { Drawable } from '@psychobolt/react-regl';

import frag from './Bunny.frag';
import vert from './Bunny.vert';

const attributes = {
  position: bunny.positions,
  normal: normals(bunny.cells, bunny.positions),
};

export default () => (
  <Drawable
    frag={frag}
    vert={vert}
    attributes={attributes}
    elements={bunny.cells}
  />
);
