package com.oscar.model;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Updates.inc;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

public class MongoController {
	private NbaDB nba;
	public MongoController() {
		this.nba = new NbaDB();
	}
	public void findFirst() { //method to find the first element in document
		MongoCollection<Document> rest = this.nba.getCollection("nba"); 
        Document doc = rest.find().first();
        System.out.println(doc.toJson());
	}
	//Update Functions
	public void updateTeam(String team1, String team2, int res1, int res2) {
		MongoCollection<Document> team = this.nba.getCollection("team");
		if(res1>res2) {
			team.updateOne(eq("name",team1), inc("wins", 1));
			team.updateOne(eq("name",team2), inc("defeat", 1));
		}else {
			team.updateOne(eq("name",team2), inc("wins", 1));
			team.updateOne(eq("name",team1), inc("defeat", 1));
		}
	}
	public List<String> getTeams(){
		MongoCollection<Document> team = this.nba.getCollection("team");
		FindIterable<Document> names = team.find();
		MongoCursor<Document> iterator = names.iterator();
		List<String> list_of_names = new ArrayList<String>();
		while(iterator.hasNext()) {
			Document next = iterator.next();
			list_of_names.add(next.getString("name"));
		}
		return list_of_names;
	}
	public String obtainThumbnail(String name) {
		MongoCollection<Document> team = this.nba.getCollection("team");
		FindIterable<Document> names = team.find(eq("name",name));
		MongoCursor<Document> iterator = names.iterator();
		List<String> list_of_names = new ArrayList<String>();
		while(iterator.hasNext()) {
			Document next = iterator.next();
			list_of_names.add(next.getString("thumbnail"));
		}
		return list_of_names.get(0);
	}
	
	public void createMatch(String team1, String team2, int res1, int res2, String pl1, String pl2) {
		MongoCollection<Document> match = this.nba.getCollection("match");
		Document insertion = new Document("_id",new ObjectId());
		insertion.append("team1", team1)
		.append("team2", team2)
		.append("FT:", res1+"-"+res2)
		.append("scorer1", pl1)
		.append("scorer2",pl2)
		.append("date",new Date(System.currentTimeMillis()-24*60*60*1000));
		match.insertOne(insertion);
	}
	public void createPlayer(String fullName, double weight, double heigh,String team, String pos, String year, int draft_number,
			String university,String thumbnail) {
		MongoCollection<Document> player = this.nba.getCollection("player");
		Document insertion = new Document("_id",new ObjectId());
		insertion.append("name", fullName)
		.append("weight", weight)
		.append("heigh", heigh)
		.append("team", team)
		.append("position", pos)
		.append("draft_year",year)
		.append("draft_number",draft_number)
		.append("university", university)
		.append("thumbnail",thumbnail);
		player.insertOne(insertion);
	}
}
