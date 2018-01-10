// @flow
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import SearchForm from './components/searchform';

export default (
  <Grid>
    <Row>
      <Col className="col-centered" xs={12} md={8}
           style={{ textAlign: 'center' }}>
        <img src={require('./imgs/oc-logo-icon.svg')} alt="Open Collective"
             style={{ marginRight: 20 }} />
        <img src={require('./imgs/title.svg')} alt="Open Collective" />
      </Col>
    </Row>
    <Row>
      <Col className="col-centered col-form" xs={12} md={8}>
        <SearchForm />
      </Col>
    </Row>
  </Grid>
);
