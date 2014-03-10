App = Ember.Application.create()
App.Router.map ->
  @resource "people",
    path: "/"

  return

App.PeopleRoute = Ember.Route.extend(model: ->
  App.Person.find()
)
App.PeopleController = Ember.ArrayController.extend(actions:
  addPerson: ->
    person =
      firstName: @get("firstName")
      lastName: @get("lastName")

    App.Person.add person
    return

  deletePerson: (person) ->
    App.Person.remove person
    return
)
App.Person = Ember.Object.extend(
  firstName: ""
  lastName: ""
  fullName: (->
    firstName = @get("firstName")
    lastName = @get("lastName")
    firstName + " " + lastName
  ).property("firstName", "lastName")
)

App.Person.reopenClass
  people: []
  add: (hash) ->
    person = App.Person.create(hash)
    @people.pushObject person
    return

  remove: (person) ->
    @people.removeObject person
    return

  find: ->
    self = this
    $.getJSON "/api/people", ((response) ->
      response.forEach (hash) ->
        person = App.Person.create(hash)
        Ember.run self.people, self.people.pushObject, person
        return

      return
    ), this
    @people
