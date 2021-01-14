

#  MUNICIPAL_ELECTION_2020


## **🎬 Description**

This project consists of an analysis of the municipal elections during the covid-19 period.
Our mission is to create scripts to download some data provided by the government about the municipal elections in paris then display the results on a graphic map


## **🧱 Scripts**

First of all you have to activate your environnement with this command : ```source ./venv/bin/activate``` </br>
In this folder you will find 3 scripts : </br>
```downloadElectionXLS_script.py``` : This script allows the download of data provided by the open data on municipal elections.</br>
```mergeExcelToCSV_script.py``` : This script allows to convert a set of xls files into a single csv file. </br>
```insertToMongo_script.py``` : This script allows the insertion of a csv file in a mongo database. </br>

Start the script in the following order : </br>
```python downloadElectionXLS_script.py``` </br>
```python mergeExcelToCSV_script.py``` </br>
```python insertToMongo_script.py``` </br>


## **:rocket: Backend**
The project will create a databased name MunicipalElection with two collections ```Candidate``` and ```PollingStation``` </br>

* ressource to get all pollingStation
  * ``` [GET]  /pollingStation```
* ressource to get all candidat
  * ``` [GET]  /candidat```
* ressource to get candidat list by district and turn
  * ``` [GET]  /candidatListByDisctrictAndTurn/<int:district>/<int:turn>```
* ressource for get distinct candidat list and total vote by district and turn
  * ``` [GET]  /candidatListDistinctAndTotalVote/<int:district>/<int:turn>```
* filtre par nom distinct qui a le plus grand nb de vote par arrondissement et par tour
  * ``` [GET]  /candidatListAndTotalVote/<int:district>/<int:turn>```


Go to the backend folder : ```dataviz_backend``` </br>
Activate your environment with : ```python3 -m venv venv```  ```source ./venv/bin/activate``` </br>
And install every depedencies needed with pip install</br>
example : ```pip install pandas``` , ```pip install xlrd```, ```pip install PyMongo``` ...</br>

When all the installation is done start the backend with ```python main.py``` </br>

The server should start on http://127.0.0.1:5000/</br>

## **:rocket: Frontend**
Go to the frontend folder : ```react_dataviz_client``` </br>
Install the projet with ``` yarn install ``` </br>
Start the project with yarn start, the server should be ready after that



## **💻 Technologies**

**Mongodb** _(database)_

**React** _(front js framework)_

**Python** _(language)_

**Flask** _(Micro Framework python who allow you to create API)_

**D3 JS** _(lib javascript)_

**Panda** _(lib python)_

**Numpy** _(lib python)_

**PyMongo** _(lib python)_



<br/>
