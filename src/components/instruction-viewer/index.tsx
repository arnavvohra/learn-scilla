import React from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';

interface IProps {
  instruction: string;
}

const CodeInstruction: React.SFC<IProps> = (props) => (
  <div className="code-instruction-container">
    <ReactMarkdown source={props.instruction} />
  </div>
);

export default CodeInstruction;
