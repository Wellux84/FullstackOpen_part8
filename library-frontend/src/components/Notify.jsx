const Notify = ({ message }) => {
	if (!message) {
		return null
	}

	return <div >{message}</div>
}

export default Notify
