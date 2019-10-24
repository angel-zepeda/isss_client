import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './components/About';
import Secretaria from './components/Secretaria/Secretaria';
import SecretariaForm from './components/Secretaria/SecretariaForm';
import EditSecretaria from './components/Secretaria/Edit';
import Integrador from './components/Integrador/Integrador';
import IntegradorForm from './components/Integrador/IntegradorForm';
import IntegradorShow from './components/Integrador/IntegradorShow';
import IntegradorEdit from './components/Integrador/EditIntegrador';
import Coordinandor from './components/Coordinador/Coordinador';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/about" component={About} />
      <Route exact path="/secretaria" component={Secretaria} />
      <Route exact path="/secretaria-new" component={SecretariaForm} />
      <Route exact path="/secretaria-edit/:id" component={EditSecretaria} />
      <Route exact path="/integrador" component={Integrador} />
      <Route exact path="/integrador-new/:id" component={IntegradorForm} />
      <Route exact path="/integrador-show/:id" component={IntegradorShow} />
      <Route exact path="/integrador/edit/:id" component={IntegradorEdit} />
      <Route exact path="/coordinador" component={Coordinandor} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


