import  { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SessionChecker = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkSession = () => {
            const sessionId = sessionStorage.getItem('sessionId');
            const email = localStorage.getItem('email');
            const role = localStorage.getItem('role');
            const userId = localStorage.getItem('userId');

            // Nếu không có session (browser mới mở), clear localStorage
            if (!sessionId) {
                localStorage.clear();
            }

            // Các trang không cần đăng nhập
            const publicRoutes = ['/', '/login', '/register'];
            const isPublicRoute = publicRoutes.includes(location.pathname);

            // Nếu là trang yêu cầu đăng nhập nhưng không có thông tin đăng nhập
            if (!isPublicRoute && (!email || !role || !userId || !sessionId)) {
                navigate('/login');
                return;
            }

            // Kiểm tra quyền truy cập các trang đặc biệt
            const isDashboardRoute = location.pathname.startsWith('/dashboard');
            const isAdminRoute = location.pathname.startsWith('/admin');

            if (isDashboardRoute && role !== 'manager') {
                navigate('/');
            } else if (isAdminRoute && role !== 'admin') {
                navigate('/');
            }
        };

        checkSession();
    }, [navigate, location.pathname]);

    return children;
};

export default SessionChecker;