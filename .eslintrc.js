module.exports = {
	"env": {
		"node": true,
	},
	"extends": [
		"eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        // "airbnb",
        // "airbnb-typescript"
	],
	"parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
    "plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			4
		],
		"quotes": [
			"error",
			"double"
        ],
        "@typescript-eslint/no-namespace": [
            "off"
        ],
        "no-inner-declarations": [
            "off"
        ]
	}
}
