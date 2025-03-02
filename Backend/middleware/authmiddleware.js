// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

const handleRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  const user = await User.findOne({ refreshToken });
  if (!user) return res.status(403).json({ message: 'Forbidden' });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err || user._id !== decoded.id) return res.status(403).json({ message: 'Forbidden' });
    
    const accessToken = jwt.sign(
      { id: user._id, isLawyer: user.isLawyer },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 900000
    });

    res.json({ accessToken });
  });
};

module.exports = { verifyAccessToken, handleRefreshToken };