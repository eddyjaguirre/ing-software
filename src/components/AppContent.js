import React from 'react'

const styles = {
  container: {
    flexGrow: 1,
    paddingTop: '88px'
  }
}

export default function AppContent(props) {
  return (
    <div style={styles.container}>
			{props.children}
		</div>
  )
}

