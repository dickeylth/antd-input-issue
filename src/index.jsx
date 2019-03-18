import React from 'react';
import { render } from 'react-dom';
import { DatePicker, Input } from 'antd';
import moment from 'moment';

const App = () => {
  return (
    <div>
      <Input />
      <DatePicker
        defaultValue={moment()}
        disabledDate={current =>
          current && current >= moment().startOf("day")
        }
      />
    </div>
  );
}

render(<App />, document.getElementById('root'));

