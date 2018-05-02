# Cyclus Input Checker
A simple javascript tool built to check cyclus input files in the form of xml or json for the purpose of a more interactve tutorial.

# Functions
**def makeOutputText**(*param1: str*)

Takes a string and makes an element to be displayed in outfield of the html

Example: `makeOutputText("hello world")`

Args:

	param1: text to be outputed
_____

**def xmlControlCheck**(*param1: int, param2: int, param3: int, param4: boolean*)

Checks the control tag if it has corresponding duration, start month, and start year. Can be used to only check duration since start month and start year irrelevant.

Example: `xmlControlCheck(500,6,2015,true);`

Args:
	
	param1: Value of duration

	param2: Start month

	param3: Start year

	param4: True if month and year are to be checked, false if they are irrelevant. 
_____

**def xmlCheckCommodities**(*param1:str, param2:int*)

Checks if there is a commodity value with corresponding name and resptive priority value

Example:`xmlCheckCommodities("U-ore",1.0);`

Args:

	param1: name of commodity

	param2: value of priority
______

**def xmlCheckRegionEntry**(*param1: str, param2: str[], param3: float[]*)

Checks for region with corresponding name, with entries containing corresponding prototype names and respective number valus

Example:`xmlCheckRegionEntry("Nuclandia",["EnrichPlant","ALWR","U mine","NuclearUnderground"],[1,5,1,1]);`

Args:

	param1: Name of region

	param2: Array of name prototypes

	param3: Array of correspodning number values for prototypes
______

**def xmlCheckRecipe**(*param1: str, param2: str,param3: str[], param4: string[]*)

Checks if the recipe with name has the corresponding basis, and nuclide ID with respective nuclide compositions

Example: `xmlCheckRecipe("Nat-U","mass",[92235,92238],[.0070002,.9930002])`

Args:

	param1: Name of recipe

	param2: Basis of recipe

	param3: Array of nuclide ID or names

	param4: Array of compositions in same order with respect to nuclide ID or names   
_____