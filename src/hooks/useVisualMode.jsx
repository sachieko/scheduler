import React, { useState } from 'react';

const useVisualMode = (viewmode) => {
  const [mode, setMode] = useState(viewmode);
  const [history, setHistory] = useState([viewmode])

  const transition = (next, replace) => {
    if (!replace) {
      setHistory(prev => [next, ...prev]);
      setMode(next); 
    }
    if (replace) {
      setHistory(prev => [...prev].slice(1));
      setHistory(prev => [next, ...prev]);
      setMode(next);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[1]);
      setHistory(prev => [...prev].slice(1));
    }
  };

  return {
    mode,
    transition,
    back
  };
};

exports.useVisualMode = useVisualMode;