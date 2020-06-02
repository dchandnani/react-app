import withRoot from './withRoot';
import React from 'react';
import NavBar from './components/NavBar';
import ProductHero from './components/ProductHero';
import Learn from './components/Learn';
import Flex from './components/Flex';
import Images from './components/Images';
import Forms from './components/Forms';
import Tables from './components/Tables';
import StudentList from './components/Students/StudentList';
import EditStudent from './components/Students/EditStudent';
import CreateStudent from './components/Students/CreateStudent';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <Router>
        <Switch>
          <Route exact path="/" component={ProductHero}/>
          <Route exact path="/learn" component={Learn}/>
          <Route exact path="/flex" component={Flex}/>
          <Route exact path="/images" component={Images}/>
          <Route exact path="/forms" component={Forms}/>
          <Route exact path="/tables" component={Tables}/>
          <Route exact path="/student-list" component={StudentList}/>
          <Route exact path="/edit-student/:id" component={EditStudent}/>
          <Route exact path="/create-student" component={CreateStudent}/>
          <Route component={ProductHero}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

//export default withRoot(App);
export default App;
