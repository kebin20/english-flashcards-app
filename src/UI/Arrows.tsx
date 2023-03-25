function ArrowForward({ onClick }) {
  return (
    <svg
      onClick={onClick}
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 96 960 960"
      width="48"
    >
      <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
    </svg>
  );
}

function ArrowBack({ onClick }) {
  return (
    <svg
      onClick={onClick}
      role="button"
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 96 960 960"
      width="48"
    >
      <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
    </svg>
  );
}

export { ArrowForward, ArrowBack };
