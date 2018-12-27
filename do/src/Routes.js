import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

export default function Routes ({routes}) {
  return (
    <BrowserRouter>
      <GenerateRoutes routes={routes} />
    </BrowserRouter>
  );
}

function GenerateRoutes ({routes}) {
  return routes.map(r => (
    <Route key={'path-' + r.path} path={r.path} component={r.component} exact={r.exact} />
  ));
}
