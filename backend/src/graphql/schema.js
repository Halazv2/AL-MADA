const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLFloat, GraphQLInt, GraphQLBoolean} = require("graphql");
const data = require("../models/data");

const DataType = new GraphQLObjectType({
  name: "Data",
  fields: () => ({
    _id: {type: GraphQLString},
    file_name: {type: GraphQLString},
    file_type: {type: GraphQLString},
    file_size: {type: GraphQLFloat},
    file_path: {type: GraphQLString},
  }),
});

const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    data: {
      type: new GraphQLList(DataType),
      args: {_id: {type: GraphQLString}},
      resolve(parent, args) {
        return data.find({_id: args._id});
      },
    },
    datas: {
      type: new GraphQLList(DataType),
      resolve(parent, args) {
        return data.find({});
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addData: {
      type: DataType,
      args: {
        file_name: {type: GraphQLNonNull(GraphQLString)},
        file_type: {type: GraphQLNonNull(GraphQLString)},
        file_size: {type: GraphQLNonNull(GraphQLFloat)},
        file_path: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        let dataModel = new data({
          file_name: args.file_name,
          file_type: args.file_type,
          file_size: args.file_size,
          file_path: args.file_path,
        });
        return dataModel.save();
      },
    },
    updateData: {
      type: DataType,
      args: {
        _id: {type: GraphQLNonNull(GraphQLString)},
        file_name: {type: GraphQLNonNull(GraphQLString)},
        file_type: {type: GraphQLNonNull(GraphQLString)},
        file_size: {type: GraphQLNonNull(GraphQLFloat)},
        file_path: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        return data.findOneAndUpdate(
          {_id: args._id},
          {
            file_name: args.file_name,
            file_type: args.file_type,
            file_size: args.file_size,
            file_path: args.file_path,
          },
          {new: true}
        );
      },
    },
    deleteData: {
      type: DataType,
      args: {
        _id: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        return data.findOneAndDelete({_id: args._id});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});
