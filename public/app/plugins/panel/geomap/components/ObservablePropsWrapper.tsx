<<<<<<< HEAD
import React, { Component } from 'react';
=======
import { Component } from 'react';
import * as React from 'react';
>>>>>>> v12.1.0
import { Observable, Unsubscribable } from 'rxjs';

interface Props<T> {
  watch: Observable<T>;
  child: React.ComponentType<T>;
  initialSubProps: T;
}

interface State<T> {
  subProps: T;
}

<<<<<<< HEAD
export class ObservablePropsWrapper<T> extends Component<Props<T>, State<T>> {
=======
export class ObservablePropsWrapper<T extends {}> extends Component<Props<T>, State<T>> {
>>>>>>> v12.1.0
  sub?: Unsubscribable;

  constructor(props: Props<T>) {
    super(props);
    this.state = {
      subProps: props.initialSubProps,
    };
  }

  componentDidMount() {
    this.sub = this.props.watch.subscribe({
      next: (subProps: T) => {
<<<<<<< HEAD
        //console.log('ObservablePropsWrapper:NEXT', subProps);
        this.setState({ subProps });
      },
      complete: () => {
        //console.log('ObservablePropsWrapper:complete');
      },
      error: (err) => {
        //console.log('ObservablePropsWrapper:error', err);
      },
=======
        this.setState({ subProps });
      },
      complete: () => {},
      error: (err) => {},
>>>>>>> v12.1.0
    });
  }

  componentWillUnmount() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  render() {
    const { subProps } = this.state;
    return <this.props.child {...subProps} />;
  }
}
