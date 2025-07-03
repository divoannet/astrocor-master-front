export const LevelIcon = ({ size = 24, level = 1 }) => {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" fill={level >= 1 ? 'currentColor' : 'none'} />
    <path d="M6.5 17m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" fill={level >= 2 ? 'currentColor' : 'none'} />
    <path d="M17.5 17m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" fill={level >= 3 ? 'currentColor' : 'none'} />
  </svg>
  )
}