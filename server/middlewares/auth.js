import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  // defensive: make sure req exists
  if (!req) {
    return res.status(500).json({ success: false, message: 'Server error: missing request' });
  }

  // keep same header extraction you have (expects a header called "token")
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode && tokenDecode.id) {
      // MINIMAL CHANGE: ensure req.body exists (avoid TypeError)
      req.body = req.body || {};
      req.body.userId = tokenDecode.id;

      // optionally also set req.user so other code can use it if desired
      req.user = req.user || {};
      req.user.id = tokenDecode.id;

      next();
    } else {
      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }
  } catch (err) {
    console.log('Auth error:', err);
    return res.json({ success: false, message: err.message });
  }
};

export default userAuth;
