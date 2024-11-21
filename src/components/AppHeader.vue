<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/book" class="navbar-brand">Ứng dụng Quản lý mượn sách</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'book' }" class="nav-link">
                    Sách
                    <i class="fas fa-book"></i>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link :to="{ name: 'publisher' }" class="nav-link">
                    Nhà xuất bản
                    <i class="fas fa-print"></i>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link :to="{ name: 'librarian' }" class="nav-link">
                    Nhân viên
                    <i class="fas fa-user"></i>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link :to="{ name: 'reader' }" class="nav-link">
                    Độc giả
                    <i class="fas fa-user"></i>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link :to="{ name: 'following' }" class="nav-link">
                    Theo dõi mượn sách
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>