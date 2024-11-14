import PropTypes from "prop-types";

function Avatar({user, big}) {
    if (big) {
        return (
            <div className="avatar hero">
                <img src={user.avatarUrl} alt=""/>
                <h1>{user.userName}</h1>
            </div>
        )
    } else {
        return (
            <div className="avatar hero">
                <img src={user.avatarUrl} width={30} alt=""/>
                <h3>{user.userName}</h3>
            </div>
        )
    }

}

Avatar.propTypes = {
    user: PropTypes.object.isRequired,
    big: PropTypes.bool.isRequired
}

export default Avatar;