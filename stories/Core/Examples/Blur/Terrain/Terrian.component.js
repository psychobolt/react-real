// @flow
import * as React from 'react';

import { Drawable } from '@psychobolt/react-regl';

import frag from './Terrain.frag';
import vert from './Terrain.vert';

type Args = {
  heightTexture: any,
  rockTexture: any,
  xzPosition: any,
  elements: any,
}

type Props = {
  args: Args,
} & Args;

export default ({ heightTexture, rockTexture, xzPosition, elements, args }: Props) => (
  <Drawable
    frag={frag}
    vert={vert}
    uniforms={{
      heightTexture,
      rockTexture,
    }}
    attributes={{
      xzPosition,
    }}
    elements={elements}
    args={args}
  />
);
