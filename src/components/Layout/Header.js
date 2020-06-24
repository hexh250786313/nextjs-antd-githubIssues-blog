import PropTypes from 'prop-types';

const Header = ({ pic, title }) => {
  return pic ? (
    <div className="header" style={{ backgroundImage: `url(${pic})` }}>
      {title}
      <style jsx>
        {`
          .header {
            background-repeat: no-repeat;
            width: 100%;
            height: 100px;
            background-size: contain;
          }
        `}
      </style>
    </div>
  ) : null;
};

Header.propTypes = {
  pic: PropTypes.string,
  title: PropTypes.string,
};

Header.defaultProps = {
  pic: '',
  title: '',
};

export default Header;
