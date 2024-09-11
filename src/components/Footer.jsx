import { FaMountainSun } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
      <footer>
        <p>Site designed by <a href='https://ryandesign.co/' target="_blank" rel='noopener noreferrer'>Ryan Design Co<FaMountainSun style={{ marginBottom: '-.2rem', marginLeft: '.25rem'}}/></a></p>
        <p>Follow on <a href='https://github.com/rustydustyryan' target="_blank" rel='noopener noreferrer'>GitHub  <FaGithub style={{ marginBottom: '-.1rem', marginLeft: '.05rem'}}/></a></p>
      </footer>
    </div>
  )
}

export default Footer