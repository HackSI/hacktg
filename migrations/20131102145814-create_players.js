module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable( 'Players', {
        id: {
            type: DataTypes.INTEGER
            , primaryKey: true
            , autoIncrement: true
        }
        , name: DataTypes.STRING
        , createdAt: DataTypes.DATE
        , updatedAt: DataTypes.DATE
    } );

    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable( 'Players' );
    done()
  }
}
