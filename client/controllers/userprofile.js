// Meteor.methods({
//   updatePicture () {
//     MeteorCameraUI.getPicture({ width: 40, height: 40 }, (err, data) => {
//       if (err) return this.handleError(err);
 
//       this.$ionicLoading.show({
//         template: 'Updating picture...'
//       });
 
//       this.callMethod('updatePicture', data, (err) => {
//         this.$ionicLoading.hide();
//         this.handleError(err);
//       });
//     });
//   }
// });