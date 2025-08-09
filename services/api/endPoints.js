//profile
export const endPoints = {
    api:{
        userData: "/api/v1/me",
        announcement:{
            get:"/api/v1/announcement",
            search:"/api/v1/announcement/search",
        },
        leaves:{
            today:"/api/v1/user/leaves/today",
            me:"/api/v1/user/leaves/my-leave/paginated",
            types:"/api/v1/user/leaves/leave-types",
            req:"/api/v1/user/leaves",
            monthly:"/api/v1/user/leaves/monthly"
        },
        meeting:{
            rooms: "/api/v1/meeting-rooms",
            booking:{
                future:"/api/v1/room-bookings/future",
                get:"/api/v1/room-bookings",
            }
        },
        holidays:"/api/v1/holidays/",
        claimRequest:"/api/v1/user/claims"

    },
    auth:{
        login: "api/v1/user/auth/login",
        logout: "api/v1/user/auth/logout",
        refresh: "api/v1/user/auth/refresh",
        forgotPass: "api/v1/auth/verify-email",
        verifyOTP: "api/v1/auth/verify-otp",
        resetPass: "api/v1/auth/reset-password-with-otp",
    }
}