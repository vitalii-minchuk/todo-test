<template>
  <header>
    <RouterLink :to="{ name: '/' }">
      header
    </RouterLink>
    <RouterLink :to="{ name: '/todos/' }">
      todos
    </RouterLink>
    <a
      rel="noreferrer"
      href="https://github.com/vitalii-minchuk/todo-test"
      target="_blank"
      title="GitHub"
    >git</a>
  </header>
</template>
