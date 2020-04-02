// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

<<<<<<< HEAD

import './app/services/services.spec'
import './app/components/precio/preciobase/preciobase.component.spec'
import './app/components/condicion/condicion.component.spec'

=======
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
<<<<<<< HEAD
// // Then we find all the tests.
// const context = require.context('./', true, /\.spec\.ts$/);
// // const context = require.context('./app/components/precio/preciobase/', true, /\.spec\.ts$/);
// // And load the modules.
// context.keys().map(context);
=======
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
