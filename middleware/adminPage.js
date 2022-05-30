exports.getDashboard = (req, res, next) => {
  if (req.user) {
    if (req.user.role == 'admin') {
      res.status(200).render('admin/index', {
        breadcrumb: 'Dashboard',
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
