import React from 'react';

export function TabTitle(props) {
  const { id, value, active } = props;
  const _active = active ? ' active' : '';
  return (
    <li className="nav-item" role="presentation">
      <button
        className={'nav-link' + _active}
        id={id + '-tab'}
        data-bs-toggle="tab"
        data-bs-target={'#' + id}
        type="button"
        role="tab"
        aria-controls={id}
        aria-selected="true"
      >
        {value}
      </button>
    </li>
  );
}
