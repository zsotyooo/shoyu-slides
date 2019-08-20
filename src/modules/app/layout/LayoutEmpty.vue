<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="4" sm="4" md="4">
            <v-img src="../../../assets/logo.svg"></v-img>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <slot name="outside"></slot>
  </v-app>
</template>
