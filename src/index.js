import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Secretaria from './components/Secretaria/Secretaria';
import SecretariaForm from './components/Secretaria/SecretariaForm';
import EditSecretaria from './components/Secretaria/Edit';
import Integrador from './components/Integrador/Integrador';
import IntegradorForm from './components/Integrador/IntegradorForm';
import IntegradorShow from './components/Integrador/IntegradorShow';
import IntegradorEdit from './components/Integrador/EditIntegrador';
import Coordinandor from './components/Coordinador/Coordinador';
import Consultor from './components/Consultor';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'

const MyRoute = props => {
  let token = localStorage.getItem('token');
  if (token === null) {
    return <Redirect to="/" />
  }

  return <Route {...props} />
}

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <MyRoute exact path="/secretaria" component={Secretaria} />
      <MyRoute exact path="/secretaria-new" component={SecretariaForm} />
      <MyRoute exact path="/secretaria-edit/:id" component={EditSecretaria} />
      <MyRoute exact path="/integrador" component={Integrador} />
      <MyRoute exact path="/integrador-new/:id" component={IntegradorForm} />
      <MyRoute exact path="/integrador-show/:id" component={IntegradorShow} />
      <MyRoute exact path="/integrador/edit/:id" component={IntegradorEdit} />
      <MyRoute exact path="/coordinador" component={Coordinandor} />
      <MyRoute exact path="/consultor" component={Consultor} />
    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


