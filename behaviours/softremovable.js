CollectionBehaviours.defineBehaviour('softRemovable', function(getTransform, args){
  var self = this;
  self.before.remove(function (userId, doc) {
    self.update({_id: doc._id}, {$set: {removed: true, removedAt: Date.now()}});
    return false;
  });
  self.before.find(function (userId, selector, options) {
    selector.removed = {$exists: false};
  });
  self.before.findOne(function (userId, selector, options) {
    selector.removed = {$exists: false};
  });
  self.unRemove = function(selector){
    //TODO
    self.update(selector, {$set: {removed: false, unRemovedAt: Date.now()}});
  };
});
