import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { push, Push, goBack, GoBack } from 'connected-react-router';
import { Document } from 'react-pdf/dist/entry.webpack';
import { styled } from '@Styled';
import { compose } from 'recompose';
import headerSetting from '@Assets/images/icons/header-setting.svg';
import exampleModule from '@Modules/example';
// COMPONENT
import {
  NormalExample,
  StyledSystemExample,
  AntDesignExample,
  AntdModal,
} from '@Components/_base/ExampleComp';
// UTILS
import { pipe } from 'ramda';
import _ from 'lodash';
// TYPES
import { RouteComponentProps } from 'react-router-dom';
export interface IExampleProps extends RouteComponentProps<{ id?: string }> {
  push: Push;
  goBack: GoBack;
  getDogsApi: any;
}

const normalJSFn = (props: any) => console.log(props);

const NormalJSComp = styled('div')`
  width: 100px;
  height: 100px;
  margin: auto;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NormalJSCompIcon = styled('img')`
  width: 50px;
  height: 50px;
`;

class Example extends Component<IExampleProps, any> {
  state = {
    openOverlay: false,
  };
  componentDidMount() {
    // normal JS coding is okay
    normalJSFn('hello JS');
    this.props.getDogsApi({
      name: 'bong',
    });
  }
  render() {
    return (
      <>
        <div>Welcome to Example Page ID: {this.props.match.params.id}</div>
        {/* normal js component also okay */}
        <NormalJSComp>
          <NormalJSCompIcon src={headerSetting} />
        </NormalJSComp>
        <Document />
        <AntdModal
          visible={this.state.openOverlay}
          onCancel={() => this.setState({ openOverlay: false })}
        >
          <div>hello</div>
        </AntdModal>
        <StyledSystemExample
          onClick={() => {
            console.log('clicked');
            return this.props.push('/example/2');
          }}
          bg={'black'}
          color={'yellow'}
        >
          {/* testing tree shaking for ramda, lodash */}
          {pipe((s: any): any => s)(
            _.camelCase('StyledSystem Example and goto /help'),
          )}
        </StyledSystemExample>
        <NormalExample
          onClick={() => {
            console.log('clicked');
            return this.props.goBack();
          }}
          normal={'hello'}
        >
          Normal Button + go back
        </NormalExample>
        <AntDesignExample
          id={'testID'}
          data-test-id={'testID'}
          color={'red'}
          test={'hello'}
          size={'large'}
          onClick={() => this.setState({ openOverlay: true })}
        >
          Ant Button
        </AntDesignExample>
      </>
    );
  }
}

const m = (state: any) => ({});

const d = (dispatch: any) =>
  bindActionCreators({ push, goBack, ...exampleModule.actions }, dispatch);

export default compose(
  withRouter,
  connect(
    m,
    d,
  ),
)(Example);
